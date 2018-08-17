class CreateBillAnalyses < ActiveRecord::Migration[5.1]
  def change
    create_table :bill_analyses do |t|
      t.datetime :start_at
      t.datetime :end_at
      t.string :status
      t.string :current_price_kwh
      t.string :optimal_system_size

      t.references :site

      t.datetime :deleted_at
      t.index :deleted_at
      t.timestamps
    end
  end
end
