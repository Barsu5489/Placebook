class LocationsController < ApplicationController

  def index
    locations = Location.all.includes(:user)
    render inertia: 'Locations/Index', props: {
      locations: locations.as_json(include: { user: { only: [:id, :name] } })
    }
  end
  def create
    location = current_user.locations.build(location_params)
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
end
