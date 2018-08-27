class DashboardController < ApplicationController
  require 'json'

  before_action :authenticate



  def index
    @sites_details = all_sites_details
  end

  private

  def all_sites_details
    details = []
    @sites = []
    Site.all.each do |site|
      next if site.lat.blank? || site.long.blank?
      details << {
                    latlng: {lat: site.lat, lng: site.long},
                    infowindowcontent: ApplicationController.render('maps/_infowindow', locals: {:@site => site}, layout: false).gsub(/\n/,''),
                    name: site.full_name,
                    id: site.id
                  }
      @sites << site
    end
    details.to_json
  end
end
