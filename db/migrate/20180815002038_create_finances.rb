class CreateFinances < ActiveRecord::Migration[5.2]
  def change
    create_table :finances do |t|
      t.boolean :income_proof_required
      t.datetime :income_approved_at
      t.datetime :financing_agreement_signed_at
      t.datetime :cash_downpayment_verified_at
      t.text :notes
      t.text :needed_from_consultants
      t.string :status

      t.references :site
      t.timestamps
    end
  end
end
