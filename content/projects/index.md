# Selected Projects

## Semantic Foam

### Turning real-world scenes into structured, editable 3D representations

Gif: media/semantic_foam.png  
Start: Summer 2025
End:
Tags: CUDA, 3D Reconstruction, Visual Segmentation  
Links: [Project Page](http://semanticfoam.github.io/), [Code](#), [Paper](https://arxiv.org/abs/2604.26262)

Utilizes **deep learning** to reconstruct real-world scenes in 3D by decomposing them into structured regions and segmenting objects for consistent editing and high-quality asset extraction. Built on **Radiant Foam** (similar to **3D Gaussian Splatting** but with ray-based rendering capabilities), it leverages **PyTorch**, accelerated with **CUDA C++** and **pybind11**, and is enhanced with **Total Variation** and **Cross-Entropy** losses for more stable and accurate results ,contributing to my first authorship publication at CVPR 2026 (Spotlight) !.



## MobiLyzer

### A Smartphone Tool for Everyday Liquid Safety, Quality, and Health Checks.

Gif: media/mobilyzer.png
Start: Summer 2025
Tags: Android Development (Kotlin), Pytorch , ONNX, Model Quantization, Hyperspectral Imaging 
Links: [Demo](https://drive.google.com/file/d/17MBPgdVlyyVQi0U3yGVHI9edNNDBpdK3/view), [Code](https://github.com/chercode/MobiLyzer-Android/tree/release) , [Paper](https://doi.org/10.1145/3770678)

Utilized **deep learning** to develop a mobile computer vision system for real-time, on-device liquid quality classification. Built an **Android** application integrating a multi-stage **PyTorch** pipeline deployed via **ONNX**, and optimized performance through **quantization** to meet mobile compute and latency constraints. Improved robustness to varying lighting using **intrinsic image decomposition** and image processing techniques, achieving ~5s inference with 90% accuracy and contributing to a publication at ACM IMWUT 2025.



## VR Theater Experience

### A multiplayer immersive environment for visualizing large-scale art installations.

Gif: media/vr_theater.jpg  
Start: Spring 2025

Tags: Unreal Engine 5, VR Development, Multiplayer Systems, ZBrush, Autodesk Maya, Lighting Design  
Links: [Project Page](https://www.lowtideproperties.com/centre-for-digital-media-student-project/)

Developed a **multiplayer VR experience** to present a large-scale sculptural installation, focusing on spatial layout, visual storytelling, and audience immersion. Led a team of artists, directing the **visual style** and asset pipeline to align with the installation’s artistic vision. Created and prepared 3D assets using **ZBrush** and **Autodesk Maya**, and integrated them into **Unreal Engine 5**. Implemented in-engine systems including **lighting design** with day/night transitions, ambient audio, simplified IK, and replicated player spawning to deliver a cohesive interactive experience.

## Instant Neural Fields Reconstruction

### Reconstructing 3D scenes from images using differentiable neural rendering.

Gif: media/nerf.gif  
Start: Summer 2024
Tags: PyTorch, NeRF, Volume Rendering, Computer Vision, 3D Reconstruction  
Links: [Code](https://github.com/AmrMSharafeldin/instantNuralFields-Reimplementation-Pytorch-)

Implemented a **NeRF-based 3D reconstruction pipeline** for synthesizing novel views from posed RGB images. Built a fully **differentiable volume rendering system** in **PyTorch**, incorporating uniform sampling and efficient ray marching for scalable training and rendering. Conducted experiments comparing different NeRF representations, analyzing trade-offs between **rendering speed** and **reconstruction fidelity**.



