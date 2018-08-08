class CalendarEventsController < ApplicationController
  def index
    @events = JSON.parse(params[:events])
    render partial: 'index', locals: {events: @events}, layout: false
  end
end
