require 'em-websocket'

EM.run {

  @clients = []

  EM::WebSocket.run(:host => "192.168.0.29", :port => 9090) do |ws|
    ws.onopen { |handshake|
      @clients << ws
      puts "New client connected"
    }

    ws.onclose {
        puts "Connection closed"
        @clients.delete ws
    }

    ws.onmessage { |msg|
      puts "New message: #{msg}"

      @clients.each do |socket|
        socket.send msg
      end
    }
  end
}
