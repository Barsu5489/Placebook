module Admin
    class UsersController < BaseController
      def index
        @users = User.all
        render inertia: "Admin/Users/Index", props: {
          users: @users.as_json(only: [ :id, :email_address, :name, :created_at ])
        }
      end

      def destroy
        user = User.find(params[:id])
        user.destroy
        redirect_to admin_users_path, notice: "User deleted successfully"
      end
    end
end
