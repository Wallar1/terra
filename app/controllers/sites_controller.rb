class SitesController < ApplicationController
  before_action :set_site, only: %i[show edit update destroy]


  def new
    @site = Site.new
  end

  def edit
  end

  def create
    @site = check_for_site
    respond_to do |format|
      if @site.save
        flash[:notice] = 'Customer Site was successfully created!'
        format.html {redirect_to @site}
        format.any(:js,:json) {render json: {site: @site, sites_details: Site.all_sites_details}}
      else
        flash[:alerts] = @site.errors.full_messages
        format.html {redirect_to @site}
        format.any(:js,:json) {render json: @site.to_json}
      end
    end
  end

  def update
    respond_to do |format|
      if @site.update(site_params)
        flash[:notice] = 'Customer Site was successfully updated!'
        format.html { redirect_to @site }
        format.any(:json,:js) {render json: {site: @site, sites_details: Site.all_sites_details}}
      else
        flash[:alerts] = @site.errors.full_messages
        format.html { redirect_to edit_site_path(@site) }
        format.any(:json,:js) {render json: @site}
      end
    end
  end

  def show
  end

  def index
    @sites = Site.all
  end

  def destroy
    if @site.destroy
      flash[:notice] = 'Site destroyed successfully'
      redirect_to root_path
    else
      flash[:alerts] = @site.errors.full_messages
      redirect_to edit_site_path(@site)
    end
  end


  private

  def check_for_site
    if(Site.find_by_lat(site_params['lat']))
      site = Site.find_by_lat(site_params['lat'])
      site.attributes = site_params
      return site
    else
      return Site.new(site_params)
    end
  end

  def site_params
    params.require(:site).permit!

    # t.string :first_name
    #   t.string :last_name
    #   t.string :address
    #   t.float :lat
    #   t.float :long
    #   t.string :email
    #   t.string :phone
    #   t.references :customer
    #   t.references :consultant

    #   t.datetime :deleted_at
  end

  def set_site
    @site = Site.find(params[:id])
  end
end
