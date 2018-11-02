User.find_or_create_by({email: 'automatic_audit@terra.com'})
User.find_or_create_by({provider: 'google_oauth2', uid: "109299138529420173210", email: "robertwallace.naples@gmail.com", first_name: "robert", last_name: "wallace"})

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
install = Stage.find_or_create_by({name: 'install'})
permit = Stage.find_or_create_by({name: 'permit', children: [install]})
financing = Stage.find_or_create_by({name: 'financing', children: [install]})
plan_set = Stage.find_or_create_by({name: 'plan set', children: [permit]})
final_contract = Stage.find_or_create_by({name: 'final contract', children: [plan_set, financing]})
proposal = Stage.find_or_create_by({name: 'proposal', children: [final_contract]})
design = Stage.find_or_create_by({name: 'design', children: [proposal]})
prospect = Stage.find_or_create_by({name: 'prospect', children: [design]})

Site.create({first_name: "First", last_name: "Customer", address: "1255 almar street, concord, ca, usa", lat: 37.9694491, lng: -122.0296934})
Site.create({first_name: "Second", last_name: "Customer", address: "1255 almar street, concord, ca, usa", lat: 37.969087, lng: -122.029440})