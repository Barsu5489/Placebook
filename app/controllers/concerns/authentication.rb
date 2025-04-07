module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :set_current_session
    before_action :require_authentication
    helper_method :authenticated?
  end

  class_methods do
    def allow_unauthenticated_access(**options)
      skip_before_action :require_authentication, **options
    end
  end

  private
    def set_current_session
      Rails.logger.debug "Setting current session from cookie: #{cookies.signed[:session_id]}"
      Current.session = Session.find_by(id: cookies.signed[:session_id])
      Rails.logger.debug "Current session set to: #{Current.session&.id}"
    end

    def authenticated?
      Current.session.present?
    end

    def require_authentication
      unless authenticated?
        redirect_to login_path, alert: "Please log in to continue."
      end
    end

    def start_new_session_for(user)
      Rails.logger.debug "Creating new session for user: #{user.id}"

      session = user.sessions.create!(
        user_agent: request.user_agent,
        ip_address: request.remote_ip
      )

      Current.session = session

      cookies.signed[:session_id] = {
        value: session.id,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax,
        expires: 30.days.from_now
      }

      Rails.logger.debug "New session created with ID: #{session.id}"
      session
    end

    def terminate_session
      Current.session&.destroy
      cookies.delete(:session_id)
      Current.session = nil
    end
end
