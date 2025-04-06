class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: "Try again later." }

  def new
    render inertia: "Login"
  end

  def create
    Rails.logger.info "Login attempt params: #{params.inspect}"
    if user = User.authenticate_by(params.permit(:email_address, :password))
      Rails.logger.info "User authenticated: #{user.email_address}"
      start_new_session_for user
      redirect_to after_authentication_url
    else
      Rails.logger.info "Authentication failed"
      redirect_to new_session_path, 
        inertia: { errors: { email_address: "Invalid email or password" } },
        alert: "Try another email address or password."
    end
  end

  def destroy
    terminate_session
    redirect_to new_session_path
  end
end
