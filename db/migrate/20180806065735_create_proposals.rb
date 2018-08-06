class CreateProposals < ActiveRecord::Migration[5.1]
  def change
    create_table :proposals do |t|
      t.datetime :start_at
      t.datetime :end_at
      t.string :status
      t.string :is_contract
      t.string :finance_type
      t.string :discount_level

      t.references :design
      
      t.datetime :deleted_at
      t.index :deleted_at
      t.timestamps
    end
  end
end
