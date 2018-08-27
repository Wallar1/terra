class CreateInstalls < ActiveRecord::Migration[5.2]
  def change
    create_table :installs do |t|
      t.string :approvals, array: true, default: []

      t.string :install_status
      t.text :install_notes
      t.datetime :install_approved_at
      t.datetime :instsall_scheduled_at
      t.datetime :install_started_at
      t.datetime :install_completed_at

      t.string :mpu_status
      t.text :mpu_notes
      t.datetime :mpu_approved_at
      t.datetime :mpu_scheduled_at
      t.datetime :mpu_started_at
      t.datetime :mpu_completed_at

      # t.references :mpu_company
      # t.references :install_company
      t.references :site

      t.timestamps
    end
  end
end
