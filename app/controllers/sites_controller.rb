class SitesController < ApplicationController
  before_action :set_site, only: %i[show edit update destroy]

  def new
    @site = Site.new
  end

  def edit
  end

  def create
    @site = Site.new(site_params)
    if @site.save
      flash[:notice] = 'Customer Site was successfully created!'
      redirect_to site_path(@site)
    else
      flash[:alerts] = @site.errors.full_messages
      redirect_to new_site_path
    end
  end

  def update
    if @site.save
      flash[:notice] = 'Customer Site was successfully updated!'
      redirect_to site_path(@site)
    else
      flash[:alerts] = @site.errors.full_messages
      redirect_to edit_site_path(@site)
    end
  end

  def show
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
