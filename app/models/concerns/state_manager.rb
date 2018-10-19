module StateManager
  include ActiveSupport::Concern

  # structure:
  # note: post_green_light_redesign can happen anywhere after contract stage
  #
  #
  #                        site
  #                         |
  #                     bill analysis
  #                         |
  #                       design
  #                         |
  #                     Proposal
  #                         |
  #                     final contract
  #                         /\
  #                   planset  financing
  #                    |            |
  # ahj_corrections --permit       / 
  #                     \        /
  #                      install -- on_site_redesign
  #                        /\
  #                     ps1  ps2
  #

  def initial_stage
    self.stages = [Stage.find_by(name: 'prospect')] if stages.blank?
  end

  def move_to_next_stage?
    if stage_change.present?
      self.stages = Stage.all.where(name: stage_change)
      return true
    end
    check_stage_set_children
  end

  def check_stage_set_children
    children = []
    self.stages.each do |stage|
      if stage_complete? stage
        children << stage.children
      else
        children << stage
      end
    end
    stages_unchanged = (self.stages == children.flatten)
    self.stages = children.flatten
    # if stages have changed, we check again with the new children to see if they are complete as well (so more than 1 stage can be completed each time)
    stages_unchanged || check_stage_set_children
  end

  def stage_complete? stage
    self.send(stage.name.gsub(' ','_') + '_complete?')
  end

  def prospect_complete?
    return self.first_name.present? &&
              self.last_name.present?

  end

  def design_complete?
    return self.phone.present?
  end

  def proposal_complete?
    return true
  end

  def final_contract_complete?
    return self.notes.present?
  end

  def plan_set_complete?
    return true
  end

  def financing_complete?
    return false
  end

  def permit_complete?
    true
  end

  def install_complete?
    false
  end
end
