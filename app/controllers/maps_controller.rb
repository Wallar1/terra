class MapsController < ApplicationController
  def index
    #@sites_details = all_sites_details
  end

  # also sets @sites
  def all_sites_details
    details = []
    @sites = []
    Site.all.each do |site|
      next if site.lat.blank? || site.long.blank?
      details << {
                    latlng: {lat: site.lat, lng: site.long},
                    #infowindowcontent: ApplicationController.render('maps/_infowindow', locals: {:@site => site}, layout: false).gsub(/\n/,''),
                    id: site.id,
                    icon_url: site.icon_url.present? ? site.icon_url : 'house_question.png',
                    first_name: site.first_name || '',
                    last_name: site.last_name || '',
                    address: site.address || '',
                    email: site.emails || [],
                    phone: site.phone || '',
                    notes: site.notes || '',
                  }
      @sites << site
    end
    render json: details.to_json
  end

  # def get_icon stage
  #   stages = {
  #     call_back: 'house_phone.png',
  #     go_back: 'house_redo.png',
  #     appointment_set: 'house_calendar.png',
  #     not_home: 'house_question.png',
  #     not_interested: 'house_question.png',
  #     renter: 'house_question.png',
  #     not_qualified: 'house_x.png',
  #     under_contract: 'house_contract.png',
  #     closed_business: 'house_x.png',
  #     sold: 'house_sun.png',
  #     installed_already: 'house_check.png',
  #   }
  #   stages[stage]
  # end
end