class SearchesController < ApplicationController
  def create
    @sites = Search.find_sites(search_params) || []
    render partial: 'sites/index', layout: false
  end


  private

  def search_params
    params.require(:search).permit!
  end
end