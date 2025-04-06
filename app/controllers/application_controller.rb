class ApplicationController < ActionController::Base
  include Authentication
  inertia_share flash: -> { flash.to_hash }
  inertia_share current_user: -> { Current.user }
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.

end
