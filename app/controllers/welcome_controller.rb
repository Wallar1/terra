class WelcomeController < ApplicationController

  def render_itinerary
    render partial: 'itinerary', locals: {events: JSON.parse(params[:events])}
  end
end
