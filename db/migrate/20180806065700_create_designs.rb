class CreateDesigns < ActiveRecord::Migration[5.1]
  def change
    create_table :designs do |t|
      t.datetime :start_at
      t.datetime :end_at
      t.datetime :qa_completed_at
      t.string :request_notes
      t.integer :request_size
      t.string :notes
      t.string :design_type
      t.string :status
      t.float :offset
      t.boolean :msp_upgrade_required
      t.string :estimated_production
      t.string :estimated_system_size

      t.references :site

      t.datetime :deleted_at
      t.index :deleted_at
      t.timestamps
    end
  end
end
