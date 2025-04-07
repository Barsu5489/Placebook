class HomeController < ApplicationController
  allow_unauthenticated_access only: :index

  def index
    locations = Location.all.includes(:user)
    render inertia: "Home/Index", props: {
      locations: locations.as_json(include: { user: { only: [ :id, :name ] } })
    }
  end
end
