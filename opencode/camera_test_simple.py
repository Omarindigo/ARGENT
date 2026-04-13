import cv2
import time

print("Testing camera access...")

# Try different camera indices
for i in range(3):
    print(f"Trying camera index {i}...")
    cap = cv2.VideoCapture(i)
    
    if cap.isOpened():
        print(f"Camera {i} opened successfully!")
        
        # Capture a few frames
        for _ in range(5):
            ret, frame = cap.read()
            if ret:
                print(f"Frame {_}: Shape {frame.shape}")
                # Save a test frame
                cv2.imwrite(f"test_frame_{i}_{_.jpg}", frame)
            else:
                print(f"Failed to read frame {_}")
                break
        
        cap.release()
        break
    else:
        print(f"Camera {i} not available")
        cap.release()

print("Test completed. Check for test_frame_*.jpg files.")