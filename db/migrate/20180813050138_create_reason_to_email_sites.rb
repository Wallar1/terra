class CreateReasonToEmailSites < ActiveRecord::Migration[5.2]
  def change
    create_table :reason_to_email_sites do |t|
      t.references :site
      t.references :reason_to_email

      t.timestamps
    end
  end
end
