class LocationsController < ApplicationController
  before_action :require_authentication

  def index
    Rails.logger.debug "LocationsController#index - Session ID: #{cookies.signed[:session_id]}"
    Rails.logger.debug "Current Session: #{Current.session&.id}"

    locations = Current.session&.user&.locations || Location.none
    render inertia: "Locations/Index", props: {
      locations: locations.as_json(include: { user: { only: [ :id, :name ] } }),
      current_user: Current.session&.user&.as_json(only: [ :id, :email_address, :name ])
    }
  end
  def create
      location = Current.session.user.locations.build(location_params)
    if location.save
      redirect_to locations_path, notice: "Location created successfully"
    else
      redirect_to locations_path, alert: location.errors.full_messages.join(", ")
    end
  end
  private

def location_params
  params.require(:location).permit(:name, :latitude, :longitude)
end
end
