import socket
import struct

def set_dataref_xp12(dataref, value, ip="127.0.0.1", port=49000):
    # 1. Create the UDP socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    
    # 2. Header: "DREF" plus a null byte (5 bytes total)
    header = b"DREF\x00"
    
    # 3. Value: 4-byte float (Little-Endian)
    packed_value = struct.pack("<f", value)
    
    # 4. Dataref: Must be exactly 500 bytes including null termination
    dataref_bytes = dataref.encode("utf-8")
    if len(dataref_bytes) > 499:
        raise ValueError("Dataref name is too long!")
        
    # Pad the string with null bytes until it hits 500
    padding = b"\x00" * (500 - len(dataref_bytes))
    dataref_padded = dataref_bytes + padding
    
    # 5. Build and send (5 + 4 + 500 = 509 bytes total)
    message = header + packed_value + dataref_padded
    
    sock.sendto(message, (ip, port))
    sock.close()

def send_command(command_path, ip="127.0.0.1", port=49000):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    # Header for commands is "CMND" + a null byte
    header = b"CMND\x00"
    message = header + command_path.encode("utf-8")
    
    sock.sendto(message, (ip, port))
    sock.close()

# Example: Set the parking brake to 'on' (1.0)
set_dataref_xp12("sim/flightmodel/controls/parkbrake", 0.0)
set_dataref_xp12("sim/cockpit2/ice/ice_window", 1.0)
set_dataref_xp12("sim/cockpit/electrical/beacon_lights_on", 1.0)