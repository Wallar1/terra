class MapsController < ApplicationController
  def index
    #@sites_details = all_sites_details
  end

  # also sets @sites
  def all_sites_with_pos
    respond_to do |format|
      format.any(:js,:json){render json: Site.all_sites_with_pos}
    end
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