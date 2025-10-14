* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #ffeb3b, #ff9800);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    text-align: center;
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    max-width: 500px;
    width: 100%;
}

h1 {
    color: #e91e63;
    margin-bottom: 30px;
    font-size: 2rem;
}

.wheel-container {
    position: relative;
    margin: 0 auto 30px;
    width: 100%;
    max-width: 400px;
}

#rueda {
    width: 100%;
    height: auto;
    border: 8px solid #ff5722;
    border-radius: 50%;
    transition: transform 4s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.pointer {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: #ff0000;
    clip-path: polygon(50% 100%, 0 0, 100% 0);
}

.btn {
    background: linear-gradient(45deg, #e91e63, #ff5722);
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 1.2rem;
    border-radius: 50px;
    cursor: pointer;
    margin: 10px;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(233, 30, 99, 0.4);
}

.btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
}

.whatsapp-btn {
    background: linear-gradient(45deg, #25D366, #128C7E);
}

.resultado {
    margin: 20px 0;
    padding: 15px;
    border-radius: 10px;
    font-size: 1.3rem;
    font-weight: bold;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Diseño Responsive */
@media (max-width: 768px) {
    .container {
        padding: 20px;
        margin: 10px;
    }
    
    h1 {
        font-size: 1.5rem;
    }
    
    .btn {
        padding: 12px 25px;
        font-size: 1rem;
    }
    
    #rueda {
        border-width: 6px;
    }
}

@media (max-width: 480px) {
    .wheel-container {
        max-width: 300px;
    }
    
    h1 {
        font-size: 1.3rem;
    }
    
    .btn {
        padding: 10px 20px;
        font-size: 0.9rem;
    }
}
