class LocationsController < ApplicationController

  def index
    locations = Location.all.includes(:user)
    render inertia: 'Locations/Index', props: {
      locations: locations.as_json(include: { user: { only: [:id, :name] } })
    }
  end
  
end
