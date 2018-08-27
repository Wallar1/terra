class CreateReasonToEmail < ActiveRecord::Migration[5.2]
  def change
    create_table :reason_to_email do |t|
      t.string :reason

      t.timestamps
    end
  end
end
