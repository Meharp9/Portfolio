import tkinter as tk
from tkinter import *
from tkinter import filedialog
import tkvideo
from PIL import Image, ImageTk
import os
import numpy as np
import cv2 as cv
import os.path
import bw2color

prototxt = "./model/colorization_deploy_v2.prototxt"
model = "./model/colorization_release_v2.caffemodel"
points = "./model/pts_in_hull.npy"

class Window(Frame):
    def __init__(self, master=None):
        Frame.__init__(self, master)
        self.master = master
        self.pos = []
        self.master.title("B&W Media Colorization")
        self.pack(fill=BOTH, expand=1)
        menu = Menu(self.master)
        self.master.config(menu=menu)
        file = Menu(menu)
        file.add_command(label="Upload Image", command=self.uploadImage)
        file.add_command(label="Upload Video", command=self.uploadVideo)
        menu.add_cascade(label="File", menu=file)
        self.canvas = tk.Canvas(self)
        self.canvas.pack(fill=tk.BOTH, expand=True)
        self.original_image = None
        self.colored_image = None
        self.image3 = None

    def uploadImage(self):
        filename = filedialog.askopenfilename(initialdir=os.getcwd())
        path = f".{filename.split('video_colorization')[1]}"
        if not filename:
            return
        load = Image.open(filename)
        load = load.resize((480, 360), Image.ANTIALIAS)
        if self.original_image is None:
            w, h = load.size
            self.render = ImageTk.PhotoImage(load)
            self.image = self.canvas.create_image((w / 2, h / 2), image=self.render)

        else:
            self.canvas.delete(self.image3)
            w, h = load.size
            self.render = ImageTk.PhotoImage(load)
            self.image = self.canvas.create_image((w / 2, h / 2), image=self.render)

        os.system(f'py bw2color.py image {path}')
        self.color()

    def color(self):
        load = Image.open("./Color_img1.jpg")
        load = load.resize((480, 360), Image.ANTIALIAS)
        if self.image is None:
            w, h = load.size
            self.render = ImageTk.PhotoImage(load)
            self.image = self.canvas.create_image((w / 2, h / 2), image=self.render)
            root.geometry("%dx%d" % (w, h))
        else:
            w, h = load.size
            self.render3 = ImageTk.PhotoImage(load)
            self.image3 = self.canvas.create_image((w / 2, h / 2), image=self.render3)
            self.canvas.move(self.image3, 500, 0)

    def uploadVideo(self):
        root = tk.Toplevel()
        root.geometry("%dx%d" % (980, 600))
        root.title("B&W Media Colorization GUI")
        my_label = Label(root)
        my_label.pack(fill=tk.BOTH, expand=1)
        video_path = filedialog.askopenfilename(initialdir=os.getcwd())

        os.system(f'py bw2color.py video {video_path}')

        video_path = "./colorized_videos/video.avi"
        player = tkvideo.tkvideo(video_path, my_label, loop=1, size=(1280, 720))
        player.play()

        root.mainloop()

root = tk.Tk()
root.geometry("%dx%d" % (980, 600))
root.title("B&W Media Colorization GUI")
app = Window(root)
app.pack(fill=tk.BOTH, expand=1)
root.mainloop()