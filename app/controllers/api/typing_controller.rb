class Api::TypingController < ApplicationController
  before_action :authenticate_user!

  def status
    MessageBus.publish '/typing', { typing: params[:typing], id: current_user.id }
  end
end
