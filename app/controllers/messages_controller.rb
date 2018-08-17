class MessagesController < ApplicationController
    before_action :set_message, only: %i[show edit update destroy]

  def new
    @message = Message.new
  end

  def edit
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      flash[:notice] = 'Customer message was successfully created!'
      redirect_to message_path(@message)
    else
      flash[:alerts] = @message.errors.full_messages
      redirect_to new_message_path
    end
  end

  def update
    if @message.save
      flash[:notice] = 'Customer message was successfully updated!'
      redirect_to message_path(@message)
    else
      flash[:alerts] = @message.errors.full_messages
      redirect_to edit_message_path(@message)
    end
  end

  def show
  end

  def destroy
    if @message.destroy
      flash[:notice] = 'message destroyed successfully'
      redirect_to root_path
    else
      flash[:alerts] = @message.errors.full_messages
      redirect_to edit_message_path(@message)
    end
  end


  private

  def message_params
    params.require(:message).permit!
    # t.string :stage
    #   t.text :content
    #   t.boolean :is_notifiable
    #   t.boolean :is_pinned
    #   t.jsonb :changed_values, default: {}

    #   t.references :site
    #   t.references :user
      
    #   t.datetime :deleted_at
    #   t.index :deleted_at
    #   t.timestamps
  end

  def set_message
    @message = Message.find(params[:id])
  end
end