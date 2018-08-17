class BillAnalysesController < ApplicationController
  before_action :set_bill, only: %i[show edit update destroy]
  
  def new
    @bill = BillAnalysis.new
  end

  def create
    @bill = BillAnalysis.new(bill_params)
    if @bill.save
      @flash[:notice] = 'Bill Analysis was created!'
      redirect_to @bill
    else
      flash[:alert] = @bill.errors.full_messages.join(', ')
      redirect_to new_bill_analysis_path
    end
  end

  def show
  end

  def update
    if @bill.update(bill_params)
      flash[:notice] = 'Bill Analysis was updated!'
      redirect_to @bill
    else
      flash[:alert] = @bill.errors.full_messages.join(', ')
      redirect_to edit_bill_path(@bill)
    end
  end

  def destroy
    if @bill.destroy
      flash[:notice] = 'Bill Analysis was destroyed successfully!'
      redirect_to dashboard_path
    else
      flash[:alert] = @bill.errors.full_messages.join(', ')
      redirect_to @bill
    end
  end

  private

  def set_bill
    @bill = BillAnalysis.find(params[:id])
  end

  def bill_params
    params.require(:bill_analysis).permit!

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