class CreateFinalContracts < ActiveRecord::Migration[5.1]
  def change
    create_table :final_contracts do |t|
      t.datetime :start_at
      t.datetime :end_at
      t.string :status
      t.datetime :signed_at
      t.datetime :greenlit_at
      t.datetime :credit_approved_at
      t.datetime :credit_expired_at
      t.float :price
      t.text :notes

      t.references :site
      
      t.datetime :deleted_at
      t.index :deleted_at
      t.timestamps
    end
  end
end
