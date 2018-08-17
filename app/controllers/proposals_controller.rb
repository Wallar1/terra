class ProposalsController < ApplicationController
  before_action :set_design, only: %i[show edit update destroy]
  
  def new
  end

  def create
    @design = Design.new(design_params)
    if @design.save
      @flash[:notice] = 'Design was created!'
      redirect_to @design
    else
      flash[:alert] = @design.errors.full_messages.join(', ')
      redirect_to new_design_path
    end
  end

  def show
  end

  def update
    if @design.update(design_params)
      flash[:notice] = 'Design was updated!'
      redirect_to @design
    else
      flash[:alert] = @design.errors.full_messages.join(', ')
      redirect_to edit_design_path(@design)
    end
  end

  def destroy
    if @design.destroy
      flash[:notice] = 'Design was destroyed successfully!'
      redirect_to dashboard_path
    else
      flash[:alert] = @design.errors.full_messages.join(', ')
      redirect_to @design
    end
  end

  private

  def set_design
    @design = Proposal.find_by_id(params[:id])
  end

  def design_params
    params.require(:design).permit!

    # t.datetime :start_at
    # t.datetime :end_at
    # t.string :status
    # t.string :current_price_kwh
    # t.string :optimal_system_size

    #   t.references :site

    #   t.datetime :deleted_at
    #   t.index :deleted_at
    #   t.timestamps
  end
end