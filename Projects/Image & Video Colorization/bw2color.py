## LIBRARIES
import numpy as np
import cv2
import imutils
import os
import sys

from os.path import isfile, join

prototxt = "./model/colorization_deploy_v2.prototxt"
model = "./model/colorization_release_v2.caffemodel"
points = "./model/pts_in_hull.npy"

def predict_elements(frame):
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    frame = cv2.cvtColor(frame, cv2.COLOR_GRAY2RGB)

    # Extracting L component
    scaled = frame.astype("float32") / 255.0
    lab = cv2.cvtColor(scaled, cv2.COLOR_RGB2LAB)
    resized = cv2.resize(lab, (224, 224))
    L = cv2.split(resized)[0]
    L -= 50
    # Predicting “a” and “b”
    net.setInput(cv2.dnn.blobFromImage(L))
    ab = net.forward()[0, :, :, :].transpose((1, 2, 0))
    ab = cv2.resize(ab, (frame.shape[1], frame.shape[0]))

    # Creating a colorized Lab photo (L + a + b)
    L = cv2.split(lab)[0]
    colorized = np.concatenate((L[:, :, np.newaxis], ab), axis=2)

    return frame, colorized

def convert_frames_to_video(pathIn, pathOut, fps):
    frame_array = []
    files = [f for f in os.listdir(pathIn) if isfile(join(pathIn, f))]

    # for sorting the file names properly
    files.sort(key=lambda x: int(x[5:-4]))

    for i in range(len(files)):
        filename = pathIn + files[i]
        # reading each files
        img = cv2.imread(filename)
        height, width, layers = img.shape
        size = (width, height)
        print(filename)
        # inserting the frames into an image array
        frame_array.append(img)

    out = cv2.VideoWriter(pathOut, cv2.VideoWriter_fourcc(*'MJPG'), fps, size)

    for i in range(len(frame_array)):
        # writing to a image array
        out.write(frame_array[i])
    out.release()

def process_image(path):
    # Load the input image, scale it and convert it to Lab
    image = cv2.imread(path)
    image, colorized_image = predict_elements(image)

    # Converting to RGB
    colorized = cv2.cvtColor(colorized_image, cv2.COLOR_LAB2RGB)
    colorized = np.clip(colorized, 0, 1)
    colorized = (255 * colorized).astype("uint8")
    cv2.imshow("Original", image)
    cv2.imshow("Colorized", colorized)

    # Image = np.clip(image, 0, 1)
    cv2.imwrite(f"./Color_{path.split('/')[2]}", cv2.cvtColor(colorized, cv2.COLOR_RGB2BGR))

def process_video(path):
    vs = cv2.VideoCapture(path)

    # Split video, frame by frame and apply model
    count = 0
    success = True
    while success:
        success, frame = vs.read()
        if frame is None:
            break
        frame = imutils.resize(frame, 500)
        frame, colorized_frame = predict_elements(frame)

        colorized = cv2.cvtColor(colorized_frame, cv2.COLOR_LAB2BGR)
        colorized = np.clip(colorized, 0, 1)
        colorized = (255 * colorized).astype("uint8")
        cv2.imshow("Original", frame)
        cv2.imshow("Colorized", colorized)

        cv2.imwrite("./colorized_video_frames/frame%d.jpg" % count, colorized)
        count += 1
        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):
            break
    vs.release()
    cv2.destroyAllWindows()

    pathIn = './colorized_video_frames/'
    pathOut = './colorized_videos/video.avi'
    fps = 30.0
    convert_frames_to_video(pathIn, pathOut, fps)

if __name__ == "__main__":
    args = sys.argv

    input_type = args[1]
    media_path = args[2]

    # Load serialized black and white colorizer model and cluster
    net = cv2.dnn.readNetFromCaffe(prototxt, model)
    pts = np.load(points)

    # Add the cluster centers as 1x1 convolutions to the model
    class8 = net.getLayerId("class8_ab")
    conv8 = net.getLayerId("conv8_313_rh")
    pts = pts.transpose().reshape(2, 313, 1, 1)
    net.getLayer(class8).blobs = [pts.astype("float32")]
    net.getLayer(conv8).blobs = [np.full([1, 313], 2.606, dtype="float32")]

    if input_type == 'image':
        process_image(media_path)

    elif input_type == 'video':
        process_video(media_path)