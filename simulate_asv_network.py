import matplotlib.pyplot as plt
import networkx as nx
import numpy as np

def plot_swarm_asv_dashboard():
    fig = plt.figure(figsize=(14, 6))
    
    # --- График 1: Топология Mesh-сети роя (АСВ) ---
    ax1 = fig.add_subplot(121)
    G = nx.random_geometric_graph(30, 0.3)  # 30 дронов в рое
    pos = nx.get_node_attributes(G, "pos")
    
    # Выделим "Диспетчерские узлы" (Edge AI)
    edge_nodes = [0, 5, 12, 25]
    regular_nodes = [n for n in G.nodes() if n not in edge_nodes]
    
    nx.draw_networkx_nodes(G, pos, nodelist=regular_nodes, node_color='blue', 
                          node_size=100, alpha=0.6, label="Ударный FPV")
    nx.draw_networkx_nodes(G, pos, nodelist=edge_nodes, node_color='red', 
                          node_size=200, label="Диспетчер (AI-узел)")
    nx.draw_networkx_edges(G, pos, alpha=0.3, edge_color='gray')
    
    ax1.set_title("Топология Mesh-сети роя (Адаптивная связь)", fontsize=12)
    ax1.legend(loc='upper right', fontsize=9)
    ax1.axis('off')
    
    # --- График 2: Эффективность АСВ (Задержки) ---
    ax2 = fig.add_subplot(122)
    scenarios = ['Без ИИ (Стандарт)', 'LSTM Оптимизация', 'Transformer (АСВ 2026)']
    latency = [120, 55, 28]  # Миллисекунды (снижение на 76%)
    survival_rate = [45, 70, 87]  # Процент выживания под РЭБ (улучшение на 42%+)
    
    x = np.arange(len(scenarios))
    width = 0.35
    
    bars1 = ax2.bar(x - width/2, latency, width, label='Задержка связи (мс)', color='orange')
    bars2 = ax2.bar(x + width/2, survival_rate, width, label='Устойчивость к РЭБ (%)', color='green')
    
    ax2.set_ylabel('Показатели')
    ax2.set_title('Влияние AI на задержки и выживаемость роя', fontsize=12)
    ax2.set_xticks(x)
    ax2.set_xticklabels(scenarios)
    ax2.legend()
    ax2.grid(axis='y', linestyle='--', alpha=0.7)
    
    plt.tight_layout()
    plt.savefig('asv_swarm_dashboard.png', dpi=150)
    print("Дашборд успешно сгенерирован: asv_swarm_dashboard.png")

if __name__ == "__main__":
    plot_swarm_asv_dashboard()