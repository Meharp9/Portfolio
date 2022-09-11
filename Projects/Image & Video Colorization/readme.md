# Image/Video Colorization using Python Scripting

### Pre-requisites
- Python 3.6 or above
- Check for models in model directory. 
  - prototext, caffemodel, numpy files must be present

### Steps to Run
- Open command line in the same directory as your script
- Install all the module dependecies using the command `pip install -r requirements.txt`
- Once command execution is complete, Execute the batch script `run.bat`

### Technologies Used

- CAFFE MODEL
  - A deep learning framework written in C++ with python and MATLAB bindings.
  - Used for Image Processing and computer vision applications
  - can process over 60M images per day

- OpenCV
  - An open-source machine learning and computer vision software library

- Lab Color Space
  - An upgrade to the previously used RGB system of colorization.
  - Takes 3 components into consideration in order to decide the color
    - L : Human Prediction of Lightness [Used to estimate the remaining components]
    - A : green-red component
    - B : blue-yellow component

- Convolutional Neural Network (CNN)

- IMAGENET
  - The image database used for training the machine learning model