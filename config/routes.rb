Rails.application.routes.draw do
  root 'dashboard#show'
  get 'login', to: redirect('/auth/google_oauth2'), as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'welcome', to: 'welcome#show', as: 'welcome'
  resources :dashboard

  resources :sites
  resources :bill_analyses
  resources :designs
  resources :proposals
  resources :final_contracts

  resources :itineraries
  resources :calendar_events
  resources :messages
end
