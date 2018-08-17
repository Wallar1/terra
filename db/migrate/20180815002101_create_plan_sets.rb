class CreatePlanSets < ActiveRecord::Migration[5.2]
  def change
    create_table :plan_sets do |t|

      t.timestamps
    end
  end
end
