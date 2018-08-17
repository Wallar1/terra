class FinalContractsController < ApplicationController
  before_action :set_final_contract, only: %i[show edit update destroy]
  
  def new
  end

  def create
    @final_contract = FinalContract.new(final_contract_params)
    if @final_contract.save
      @flash[:notice] = 'final_contract was created!'
      redirect_to @final_contract
    else
      flash[:alert] = @final_contract.errors.full_messages.join(', ')
      redirect_to new_final_contract_path
    end
  end

  def show
  end

  def update
    if @final_contract.update(final_contract_params)
      flash[:notice] = 'final_contract was updated!'
      redirect_to @final_contract
    else
      flash[:alert] = @final_contract.errors.full_messages.join(', ')
      redirect_to edit_final_contract_path(@final_contract)
    end
  end

  def destroy
    if @final_contract.destroy
      flash[:notice] = 'final_contract was destroyed successfully!'
      redirect_to dashboard_path
    else
      flash[:alert] = @final_contract.errors.full_messages.join(', ')
      redirect_to @final_contract
    end
  end

  private

  def set_final_contract
    @final_contract = FinalContract.find_by_id(params[:id])
  end

  def final_contract_params
    params.require(:final_contract).permit!

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