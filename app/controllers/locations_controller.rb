class LocationsController < ApplicationController
  allow_unauthenticated_access only: :index  # Replaces except: :index
  before_action :require_authentication, except: :index

  def index
    locations = Location.all.includes(:user)
    render inertia: 'Locations/Index', props: {
      locations: locations.as_json(include: { user: { only: [:id, :name] } })
    }
  end
  def create
      location = Current.session.use.locations.build(location_params)
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
