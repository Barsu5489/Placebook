class LocationsController < ApplicationController

  before_action :require_authentication

  def index
    locations = Current.session&.user&.locations || Location.none
    render inertia: 'Locations/Index', props: {
      locations: locations.as_json(include: { user: { only: [:id, :name] } })
    }
  end
  def create
      location = Current.session.user.locations.build(location_params)
    if location.save
      redirect_to locations_path, notice: 'Location created successfully'
    else
      redirect_to locations_path, alert: location.errors.full_messages.join(', ')
    end
  end
  private

def location_params
  params.require(:location).permit(:name, :latitude, :longitude)
end

def require_authentication
  unless Current.session&.user
    redirect_to new_session_path, alert: 'You must be logged in to access this section.'
  end
end

end
