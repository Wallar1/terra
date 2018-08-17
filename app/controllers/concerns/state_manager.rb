class StateManager
  include ActiveSupport::Concern



  def self.set_state(site)
    state = {}
    return state if site.blank? || !site.instance_of? Site

    if site.designs.any?
      proposals = site.designs.each{|d| d.proposals}.flatten
      plan_sets = site.designs.each{|d| d.plan_set}
    end

    completion = check_for_completion(site)
    state = determine_state
    return state
  end

  def check_for_completion site
    {
      site_complete: check_site(site),
      bill_analysis_complete: check_bill_analysis(site),
      designs_complete: check_designs(site),
      proposals_complete: check_proposals(site),
      final_contract_complete: check_final_contract(site),
      plan_sets_complete: check_plan_sets(site),
    }
  end

  def state_based_on_statuses req_statuses, parent
    if req_statuses.size == 2
      state[:prospect] = :active
    elsif req_statues == [true]
      state[:prospect] = :complete
    elsif req_statues == [false]
      state[:prospect] == :pending
    else
      raise 'checking site didnt have the correct req_statues'
    end
  end

  def check_site(site,&block)
    state = {}
    funcs = ['first_name.present?','phone.present?']
    req_statuses = []
    funcs.each do |func|
      req_statuses << site.instance_eval(func)
    end
    req_statuses = req_statuses.uniq

    yield site, state
  end


  def check_bill(site, state, &block)
    yield site, state
  end

  def check_designs(site, state, &block)
    yield site, state
  end

  check_site(site) do |site,state|
    check_bill(site) do |site,state|
      check_designs(site,state){}
    end
  end




  def check_site site
    funcs = []
    arr = []
    funcs.each do |func|
      arr << site.send(func)
    end
    arr = arr.uniq
    if arr.size = 2
      return 'active'
  end

  def check_bill_analysis site
  end
  # BILL_FUNCS = [
  #   'has_bill',
  #   'bill_over_65'
  # ]

  # DESIGN_FUNCS = [
  #   'design_complete',
  #   'size_estimated'
  # ]

  # PROPOSAL_FUNCS = [
  #   'proposal_uploaded',
  #   'proposal_completed'
  # ]

  # FINAL_CONTRACT_FUNCS = [
  #   'contract_signed',
  #   'contract_approved',
  #   'credit_checked'
  # ]

  def has_name
    site.first_name.present? && site.last_name.present?
  end

  def has_address
    site.address.present?
  end

  def has_bill






  # class Tree
  #   def initialize(root)
  #     @root = root
  #   end

  #   def breadth_queue
  #     q = []
  #     final = []
  #     q.push(@root) #enqueue
  #     while !q.empty?
  #       node = q.shift #dequeue
  #       final.push(node)
  #       q.push(node.children)
  #       q.flatten
  #     end
  #     return final
  #   end
  # end

  # class Node
  #   def initialize(record_name, children = [])
  #     @record_name = record_name
  #     @children = children
  #   end

  #   attr_accessor :children, :record_name

  #   def get_state
  #   end
  # end


  # structure:
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
  #                 permit         / 
  #                     \        /
  #                      install
  #                        /\
  #                     ps1  ps2


  #
  # Initializing the requirement tree
  #

  # site_node = new Node('site')
  # bill_node = new Node('bill_analysis')
  # design_node = new Node('design')
  # proposal_node = new Node('proposal')
  # final_contract_node = new Node('final_contract')
  # plan_set_node = new Node('plan_set')
  # financing_node = new Node('financing')

  # site_node.children = [bill_node]
  # bill_node.children = [design_node]
  # design_node.children = [proposal_node]
  # proposal_node.children = [final_contract_node]
  # final_contract_node.children = [plan_set_node, financing_node]

  # tree = new Tree(site_node)

  #
  # Setting up the functions for each stage/record
  #

  
end









