class RuedaFortuna {
    constructor() {
        this.canvas = document.getElementById('rueda');
        this.ctx = this.canvas.getContext('2d');
        this.girarBtn = document.getElementById('girarBtn');
        this.resultadoDiv = document.getElementById('resultado');
        this.whatsappBtn = document.getElementById('whatsappBtn');
        
        // Configuración de la rueda
        this.segmentos = this.crearSegmentos();
        this.angulo = 0;
        this.girando = false;
        this.radio = this.canvas.width / 2;
        this.centro = this.canvas.width / 2;
        
        // Control de intentos
        this.yaParticipo = localStorage.getItem('yaParticipo') === 'true';
        
        this.inicializar();
    }
    
    crearSegmentos() {
        const segmentos = [];
        
        // 10 segmentos con términos personalizados
        const terminosHelados = [
            { texto: '🎉 PREMIO 🎉', color: '#FFD700', premio: true },
            { texto: 'Dandelion', color: '#fd0303', premio: false },
            { texto: 'Helados', color: '#eb615c', premio: false },
            { texto: 'Matanzas', color: '#f6eaea', premio: false },
            { texto: 'Domicilio', color: '#fd0303', premio: false },
            { texto: 'Fresa', color: '#eb615c', premio: false },
            { texto: 'Leche Condensada', color: '#f6eaea', premio: false },
            { texto: 'Chocolate Plus+', color: '#fd0303', premio: false },
            { texto: 'Almendra', color: '#eb615c', premio: false },
            { texto: 'Mantecado', color: '#f6eaea', premio: false }
        ];
        
        // Mezclar los segmentos para distribución aleatoria
        for (let i = terminosHelados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [terminosHelados[i], terminosHelados[j]] = [terminosHelados[j], terminosHelados[i]];
        }
        
        // Crear los segmentos finales
        terminosHelados.forEach(termino => {
            segmentos.push({
                texto: termino.texto,
                color: termino.color,
                premio: termino.premio
            });
        });
        
        return segmentos;
    }
    
    inicializar() {
        this.dibujarRueda();
        this.configurarEventos();
        this.verificarIntentoPrevioso();
    }
    
    dibujarRueda() {
        const segmentoAngulo = (2 * Math.PI) / this.segmentos.length;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.segmentos.forEach((segmento, index) => {
            const anguloInicio = index * segmentoAngulo;
            const anguloFin = anguloInicio + segmentoAngulo;
            
            // Dibujar segmento
            this.ctx.beginPath();
            this.ctx.moveTo(this.centro, this.centro);
            this.ctx.arc(this.centro, this.centro, this.radio, anguloInicio, anguloFin);
            this.ctx.closePath();
            this.ctx.fillStyle = segmento.color;
            this.ctx.fill();
            this.ctx.stroke();
            
            // Dibujar texto
            this.ctx.save();
            this.ctx.translate(this.centro, this.centro);
            this.ctx.rotate(anguloInicio + segmentoAngulo / 2);
            this.ctx.textAlign = 'right';
            this.ctx.fillStyle = '#000';
            this.ctx.font = 'bold 14px Arial';
            
            // Ajustar tamaño de fuente para textos largos
            let fontSize = 14;
            if (segmento.texto.length > 15) {
                fontSize = 11;
            }
            this.ctx.font = `bold ${fontSize}px Arial`;
            
            this.ctx.fillText(segmento.texto, this.radio - 15, 0);
            this.ctx.restore();
        });
    }
    
    configurarEventos() {
        this.girarBtn.addEventListener('click', () => this.girar());
        this.whatsappBtn.addEventListener('click', () => this.compartirWhatsApp());
    }
    
    verificarIntentoPrevioso() {
        if (this.yaParticipo) {
            this.girarBtn.disabled = true;
            this.girarBtn.textContent = 'Ya participaste!';
            this.resultadoDiv.textContent = 'Solo puedes participar una vez. ¡Gracias!';
            this.resultadoDiv.style.color = '#ff5722';
        }
    }
    
    girar() {
        if (this.girando || this.yaParticipo) return;
        
        this.girando = true;
        this.girarBtn.disabled = true;
        this.resultadoDiv.textContent = '';
        this.whatsappBtn.style.display = 'none';
        
        // Ángulo aleatorio (múltiples vueltas + segmento aleatorio)
        const vueltas = 5 * 360; // 5 vueltas completas
        const segmentoAleatorio = Math.floor(Math.random() * this.segmentos.length); // 1 de 10 probabilidades
        const anguloSegmento = (360 / this.segmentos.length);
        const anguloObjetivo = vueltas + (segmentoAleatorio * anguloSegmento);
        
        this.animarGiro(anguloObjetivo, segmentoAleatorio);
    }
    
    animarGiro(anguloObjetivo, segmentoIndex) {
        const duracion = 4000; // 4 segundos
        const inicio = performance.now();
        const anguloInicial = this.angulo;
        
        const animar = (tiempoActual) => {
            const progreso = Math.min((tiempoActual - inicio) / duracion, 1);
            const easing = 1 - Math.pow(1 - progreso, 3); // Ease out
            
            this.angulo = anguloInicial + (anguloObjetivo * easing);
            
            this.ctx.save();
            this.ctx.translate(this.centro, this.centro);
            this.ctx.rotate((this.angulo * Math.PI) / 180);
            this.ctx.translate(-this.centro, -this.centro);
            this.dibujarRueda();
            this.ctx.restore();
            
            if (progreso < 1) {
                requestAnimationFrame(animar);
            } else {
                this.finalizarGiro(segmentoIndex);
            }
        };
        
        requestAnimationFrame(animar);
    }
    
    finalizarGiro(segmentoIndex) {
        this.girando = false;
        this.yaParticipo = true;
        localStorage.setItem('yaParticipo', 'true');
        
        const segmento = this.segmentos[segmentoIndex];
        
        if (segmento.premio) {
            this.resultadoDiv.innerHTML = '🎉 <strong>¡FELICIDADES!</strong> 🎉<br>¡Ganaste el Pote de Helado de Vainilla!';
            this.resultadoDiv.style.color = '#e91e63';
            this.whatsappBtn.style.display = 'inline-block';
        } else {
            this.resultadoDiv.innerHTML = `Te salió: <strong>${segmento.texto}</strong><br>¡Suerte para la próxima!`;
            this.resultadoDiv.style.color = '#ff5722';
        }
        
        this.girarBtn.textContent = 'Ya participaste';
    }
    
    compartirWhatsApp() {
        const texto = encodeURIComponent(
            '🎉 ¡He ganado el Pote de Helado de Vainilla! 🍦\n\n' +
            'Aquí está mi captura de pantalla como comprobante. ' +
            '¡Gracias por la rifa! 😊'
        );
        const url = `https://wa.me/?text=${texto}`;
        window.open(url, '_blank');
    }
}

// Inicializar la rueda cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    new RuedaFortuna();
});
