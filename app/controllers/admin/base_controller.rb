# app/controllers/admin/base_controller.rb
module Admin
    class BaseController < ApplicationController
      before_action :require_admin

      private

      def require_admin
        redirect_to root_path, alert: "Unauthorized" unless Current.session&.user&.admin?
      end
    end
end
