class RegistrationsController < ApplicationController
    allow_unauthenticated_access

    def new
      render inertia: "Register"
    end

    def create
      user = User.new(user_params)

      if user.save

        start_new_session_for user
        redirect_to root_path, notice: "Welcome to Placebook!"
      else
        redirect_to signup_path,
          inertia: { errors: user.errors.messages },
          alert: "Please fix the errors below"
      end
    end

    private

    def user_params
      params.permit(:email_address, :password, :password_confirmation)
    end
end
