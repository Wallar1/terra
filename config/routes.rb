Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'dashboard#show'
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
