Rails.application.routes.draw do

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  root 'dashboard#index'
  get 'login', to: redirect('/auth/google_oauth2'), as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'welcome', to: 'welcome#index', as: 'welcome'
  resources :dashboard

  resources :sites
  resources :bill_analyses
  resources :designs
  resources :proposals
  resources :final_contracts

  resources :itineraries
  resources :calendar_events
  resources :messages

  get 'maps', to: 'maps#index', as: 'maps'
  get 'maps/all_sites_details', to: 'maps#all_sites_details'
  
  post 'searches', to: 'searches#create'

  #mount ActionCable.server => '/cable'
end
