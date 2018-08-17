class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message_id)
    message = Message.find(message_id)
    ActionCable.server.broadcast("messages", {message_partial: render_message(message), message_id: message.id,
                                              site_id: message.site_id, stage: message.stage})
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: "messages/message", locals: {message: message, current_user_email: message.user.email})
  end
end