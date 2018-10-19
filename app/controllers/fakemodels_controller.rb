class FakemodelsController < ApplicationController
  before_action :set_fakemodel, only: [:show, :edit, :update, :destroy]

  # GET /fakemodels
  # GET /fakemodels.json
  def index
    @fakemodels = Fakemodel.all
  end

  # GET /fakemodels/1
  # GET /fakemodels/1.json
  def show
  end

  # GET /fakemodels/new
  def new
    @fakemodel = Fakemodel.new
  end

  # GET /fakemodels/1/edit
  def edit
  end

  # POST /fakemodels
  # POST /fakemodels.json
  def create
    @fakemodel = Fakemodel.new(fakemodel_params)

    respond_to do |format|
      if @fakemodel.save
        format.html { redirect_to @fakemodel, notice: 'Fakemodel was successfully created.' }
        format.json { render :show, status: :created, location: @fakemodel }
      else
        format.html { render :new }
        format.json { render json: @fakemodel.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fakemodels/1
  # PATCH/PUT /fakemodels/1.json
  def update
    respond_to do |format|
      if @fakemodel.update(fakemodel_params)
        format.html { redirect_to @fakemodel, notice: 'Fakemodel was successfully updated.' }
        format.json { render :show, status: :ok, location: @fakemodel }
      else
        format.html { render :edit }
        format.json { render json: @fakemodel.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fakemodels/1
  # DELETE /fakemodels/1.json
  def destroy
    @fakemodel.destroy
    respond_to do |format|
      format.html { redirect_to fakemodels_url, notice: 'Fakemodel was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fakemodel
      @fakemodel = Fakemodel.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def fakemodel_params
      params.fetch(:fakemodel, {})
    end
end
