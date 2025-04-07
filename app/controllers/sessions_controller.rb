class SessionsController < ApplicationController
  skip_before_action :require_authentication, only: [:new, :create]
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: "Try again later." }

  def new
    if authenticated?
      redirect_to locations_path
    else
      render inertia: 'Login'
    end
  end

  def create
 
    
    if user = User.authenticate_by(email_address: params[:email_address], password: params[:password])

      session = start_new_session_for(user)
  
      
      redirect_to locations_path
    else
      redirect_to login_path, alert: 'Invalid email or password'
    end
  end

  def destroy
    terminate_session
    redirect_to root_path
  end
end
