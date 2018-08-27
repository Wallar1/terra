class CreatePermits < ActiveRecord::Migration[5.2]
  def change
    create_table :permits do |t|
      t.text :notes_for_runner
      t.string :ahj
      t.datetime :submitted_to_ahj_at
      t.datetime :estimated_first_pickup_at
      t.datetime :payment_method
      t.datetime :estimated_additional_pickup_at
      t.datetime :issued_at
      t.datetime :delivered_at
      t.string :tracking_number
      t.text :notes
      t.string :status
      t.string :permit_type
      t.boolean :sent_for_delivery

      t.references :site
      t.timestamps
    end
  end
end
