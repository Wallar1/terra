class DashboardController < ApplicationController
  require 'json'

  before_action :authenticate

  def index
  end
end
